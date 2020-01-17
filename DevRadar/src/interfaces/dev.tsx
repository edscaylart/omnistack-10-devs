interface Geolocation {
  _id: string;
  coordinates: Number[];
  type: string;
}

export interface Dev {
  _id: string;
  avatar_url: string;
  bio: string;
  github_username: string;
  name: string;
  location: Geolocation;
  techs: string[];
}
