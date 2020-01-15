import axios from "axios";
import Dev from "../models/Dev";
import Query from "../utils/QueryFeatures";
import parseStringAsArray from "../utils/parseStringAsArray";

class DevController {
  async index(request, response) {
    const features = new Query(Dev, request.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const devs = await features.query;

    return response.json(devs);
  }

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const res = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = res.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  }
}

export default new DevController();
