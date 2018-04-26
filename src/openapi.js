const DEFAULT_OPTIONS = {
  method: 'get',
  path: '/query',
};

function loadOpenAPIDefinition(options) {
  /* Convert OpenAPI data to a flatter format
   * definition.service = "service" level information combining
   *  the OpenAPI JSON with some local settings
   * definition.operation = the OpenAPI JSON for this builder's
   *  Operation (each builder handles just one Operation, but
   *  the OpenAPI JSON may define many).
   */

  const fullOptions = Object.assign({}, options, DEFAULT_OPTIONS);

  function parseOpenAPIOperation(operationData) {
    const operation = {
      summary: operationData.summary,
      description: operationData.description,
      // List of parameter names, this is mostly to preserve the ordering
      parameterNames: [],
      // Information about each parameter
      params: {},
    };
    operationData.parameters.forEach((param) => {
      // Only handle the query parameters
      if (param.in === 'query') {
        operation.parameterNames.push(param.name);
        operation.params[param.name] = param;
      }
    });
    return operation;
  }

  function parseOpenAPIData(data) {
    const definition = {
      service: {
        title: data.info.title,
        description: data.info.description,
        host: data.host,
        basePath: data.basePath,
        path: fullOptions.path,
      },
    };
    // Extract the operation-level definition and parse that separately
    const pathData = data.paths[fullOptions.path];
    if (!pathData) {
      throw new Error(`Invalid service path given: ${fullOptions.path}`);
    }
    const operation = pathData[fullOptions.method];
    if (!operation) {
      throw new Error(`Method ${fullOptions.method} is not defined for ${fullOptions.path}`);
    }
    definition.operation = parseOpenAPIOperation(operation);
    return definition;
  }

  // Load the OpenAPI definition
  return fetch(fullOptions.url).then((response) => {
    if (response.ok) {
      return response.json().then(parseOpenAPIData);
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  });
}

export default loadOpenAPIDefinition;
