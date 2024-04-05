class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filter() {
        const queryObj = { ...this.queryStr };
        const excludeFields = ['sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((ele) => {
            delete queryObj[ele];
        });

        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
            return `$${match}`;
        });

        this.query.find(JSON.parse(queryString));
        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query.sort(sortBy);
        } else {
            this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryStr.fields) {
            // query.select('name duration groupSize')
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query.select(fields);
        }
        return this;
    }

    paginate() {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

export default APIFeatures;
