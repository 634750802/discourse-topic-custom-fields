function isDefined(value) {
  return value !== null && value !== undefined;
}

function getVersions() {
  return fetch('https://new.asktug.com/_/sso/api/tidb-releases')
    .then(response => response.json())
    .then(data => {
      const children = data.data.map(item => item.children).flat();
      children.push('未使用 TiDB');
      return children;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
}

function fieldInputTypes(fieldType) {
  return {
    isBoolean: fieldType === 'boolean',
    isString: fieldType === 'string',
    isInteger: fieldType === 'integer',
    isJson: fieldType === 'json'
  }
}

export {
  isDefined,
  fieldInputTypes,
  getVersions
}
