import parseStringAsArray from "./parseStringAsArray";

class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const { latitude, longitude, ...queryObj } = this.queryString;
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|nin|in)\b/g,
      match => `$${match}`
    );

    const filterObj = JSON.parse(queryStr);

    Object.keys(filterObj).map(key => {
      if (typeof filterObj[key] === "object") {
        Object.keys(filterObj[key]).map(innerkey => {
          if (innerkey === "$nin" || innerkey === "$in") {
            filterObj[key][innerkey] = parseStringAsArray(
              filterObj[key][innerkey]
            );
          }
        });
      }
    });
    if (latitude && longitude) {
      filterObj.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      };
    }

    this.query = this.query.find(filterObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * 100;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default QueryFeatures;
