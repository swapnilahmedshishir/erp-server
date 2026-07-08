import { Query } from 'mongoose';

export default class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>,
  ) {}

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm as string | undefined;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      } as Record<string, unknown>);
    }

    return this;
  }

  filter() {
    const queryObject = { ...this.query };

    const excludedFields = [
      'searchTerm',
      'sortBy',
      'sortOrder',
      'page',
      'limit',
      'fields',
    ];

    excludedFields.forEach((field) => delete queryObject[field]);

    this.modelQuery = this.modelQuery = this.modelQuery.find(
      queryObject as Record<string, unknown>,
    );

    return this;
  }

  sort() {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder = (this.query.sortOrder as string) || 'desc';

    const sort = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;

    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  paginate() {
    const page = Math.max(Number(this.query.page) || 1, 1);
    const limit = Math.max(Number(this.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields = this.query.fields as string | undefined;

    if (fields) {
      const selectedFields = fields.split(',').join(' ');

      this.modelQuery = this.modelQuery.select(selectedFields);
    } else {
      this.modelQuery = this.modelQuery.select('-__v');
    }

    return this;
  }

  async countTotal() {
    const query = this.modelQuery.getFilter();

    const total = await this.modelQuery.model.countDocuments(query);

    const page = Math.max(Number(this.query.page) || 1, 1);
    const limit = Math.max(Number(this.query.limit) || 10, 1);

    return {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }
}
