export const utility = {
    toQueryString: (obj) => {
        return Object.keys(obj)
          .filter(key => obj[key] != null && obj[key] !== undefined)
          .map(key => encodeURIComponent(key) + '=' + obj[key])
          .join('&');
    }
} 