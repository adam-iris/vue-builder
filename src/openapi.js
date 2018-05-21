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
      // These values might appear in multiple places
      svcTitle: this.definition.info.title,
      svcDescription: this.definition.info.description,
      opTitle: operation.summary,
      opDescription: operation.description,
    };
    model.title = model.svcTitle || model.opTitle;
    model.description = model.svcDescription || model.opDescription;

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

function cleanText(t) {
  function cleanChar(c) {
    const code = c.charCodeAt(0);
    if (code > 127) {
      console.log(`Code ${code}: ${c}`);
      return "?";
    } else {
      return c;
    }
  }
  return t.split("").map(cleanChar).join("");
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
      return response.json().then((json) => {
        console.log(json);
        cleanText(JSON.stringify(json));
        return json;
      });
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
