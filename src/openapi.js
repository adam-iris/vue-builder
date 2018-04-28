const DEFAULT_OPTIONS = {
  method: 'get',
  path: '/query',
};

/**
 * Encapsulates an OpenAPI definition, mainly in order to extract a flat
 * definition for use by the builder.
 */
class OpenAPIDefinition {
  constructor(definition) {
    this.definition = definition;
  }
  getOperation(path, method) {
    const pathData = this.definition.paths[path];
    if (!pathData) {
      throw new Error(`Invalid service path given: ${path}`);
    }
    const operation = pathData[method];
    if (!operation) {
      throw new Error(`Method ${method} is not defined for ${path}`);
    }
    return operation;
  }
  generateBuilderModel(options) {
    const fullOptions = Object.assign({}, options, DEFAULT_OPTIONS);
    const operation = this.getOperation(fullOptions.path, fullOptions.method);

    // For many of these, we have to choose between service-level and operation-level
    const model = {
      host: this.definition.host,
      basePath: this.definition.basePath,
      path: this.definition.path,
      // These could come from either, so we get both and choose below
      svcTitle: this.definition.title,
      opTitle: operation.summary,
      svcDescription: this.definition.description,
      opDescription: operation.description,
    };
    model.title = model.svcTitle;
    model.description = model.svcDescription;

    // Query parameters
    model.parameterNames = [];
    model.params = {};
    operation.parameters.forEach((param) => {
      // Only handle the query parameters
      if (param.in === 'query') {
        model.parameterNames.push(param.name);
        model.params[param.name] = param;
      }
    });
    return model;
  }
}

/**
 * Fetch an OpenAPI definition from the given URL.
 *
 * @param url
 * @returns Promise of a JSON definition
 */
function fetchOpenAPIDefinition(url) {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  });
}

/**
 * Simple public API
 *
 * @param options - Object of options.
 *      options.url - URL to retrieve the definition from
 *      options.path - Path in the definition to use (default '/query')
 *      options.method - Method in the definition to use (default 'get')
 * @returns Flat definition for a single path/method
 */
function loadOpenAPIDefinition(options) {
  return fetchOpenAPIDefinition(options.url).then((definition) => {
    return new OpenAPIDefinition(definition).generateBuilderModel(options);
  });
}

export default {
  OpenAPIDefinition,
  fetchOpenAPIDefinition,
  loadOpenAPIDefinition,
};
