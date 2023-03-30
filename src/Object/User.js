export class User {
  constructor({ ...props }) {
    // Object.assign(this, props);
    for (const key in props) {
      this[key] = props[key];
    }
  }

  updateExperience(exp) {
    this.experience += exp;
  }

  updateBadge(badge) {
    this.badge = badge;
  }
}
