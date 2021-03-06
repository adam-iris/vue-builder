/* eslint-disable */
// jshint multistr: true

/* Boilerplate to define module using AMD with fallback to global variable */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'irisUtil', 'Vue', 'Vuex'], factory);
    } else {
        // Browser globals
        root.vueBuilder = factory(jQuery, irisUtil, Vue, Vuex);
    }
}(this, function ($, irisUtil, Vue, Vuex) {

    /**
     * IMPORTANT: This library requires jQuery 3
     */

    function defaultFieldOptions(definition, name) {
        if (!definition) {
            return {};
        }
        return {
            name: name,
            // Should this have a checkbox?
            checkbox: !definition.required,
            // Text for the field label
            displayLabel: name,
            // Default value
            defaultValue: (definition.default !== undefined) ? definition.default : "",
            // Placeholder text, if any
            placeholderText:
                (definition.default !== undefined) ? ("" + definition.default) :
                    (definition.maximum) ? ("" + definition.minimum + " - " + definition.maximum) :
                        "",
            // More detailed help text
            helpText: (definition.description || ""),
            // How the field value is read from state
            fromStateValue: function(v) {
                return v;
            },
            // How the field value is saved to state
            toStateValue: function(v) {
                return v;
            },
            // How the field value appears in a query
            toQueryValue: function(v) {
                return v;
            },
            // Depends on these fields (disable if they aren't enabled/set)
            dependsOn: []
        };
    }

    var fieldTypeOptions = {
        'boolean': {
            checkbox: false,
            toQueryValue: function(v) {
                return v ? "true" : "";
            }
        },

    }


    /**
     * Base mixin for a field, this provides standard operations
     */
    var baseFieldMixin = {
        props: ['name'],
        data: function () {
            return {
                // Used for the DOM id
                uid: 'input-' + Math.random()
            };
        },
        computed: {
            definition: function() {
                return (this.$store.state.definition
                    ? this.$store.state.definition.operation.params[this.name] : {});
            },
            options: function() {
                var options = defaultFieldOptions(this.definition, this.name);
                $.extend(options, this.getFieldTypeOptions() || {});
                if (this.$store.state.options[this.name]) {
                    $.extend(options, this.$store.state.options[this.name]);
                }
                return options;
            },
            // Show a checkbox?
            checkbox: function() {
                return this.options.checkbox;
            },
            // Get/set the checkbox state
            checked: {
                get: function() {
                    return this.getState(this.name + "-check");
                },
                set: function(v) {
                    this.setState(this.name + "-check", v);
                    this.updateQuery();
                }
            },
            // Is the field enabled?
            enabled: function() {
                if (this.dependsOn) {
                    // These should disable at a higher level
                }
                return (!this.checkbox || this.checked);
            },
            // Get/set the field value
            // Subclasses should override (get/set/from/to)StateValue to
            // customize the details of how the value maps onto state
            value: {
                get: function() {
                    return this.getStateValue();
                },
                set: function(v) {
                    this.setStateValue(v);
                }
            }
        },
        methods: {
            getFieldTypeOptions: function() {
                return {};
            },
            /* These implement a simple 1-1 mapping for state and query.
             * eg. state[this.name] = this.value
             */

            /* Get the component value from the state */
            getStateValue: function() {
                var v = this.getState(this.name);
                if (v === undefined) {
                    v = this.options.defaultValue;
                }
                return this.options.fromStateValue(v);
            },
            /* Write the component value to the state */
            setStateValue: function(v) {
                this.setState(this.name, this.options.toStateValue(v));
                this.updateQuery();
            },
            /* Get the value for the query */
            getQueryValue: function() {
                return this.options.toQueryValue(this.value);
            },
            /* Produce a dictionary of query parameters */
            getQuery: function() {
                var query = {};
                query[this.name] = this.enabled ? this.getQueryValue() : "";
                return query;
            },

            /* These are basically class methods; usually,
                k = this.name
                but these allow the field to set or read things
                outside its own setting (ie. some fields may depend on
                or affect others (example?))
             */
            // Get any keyed value from the input state
            getState: function(k) {
                return this.$store.state.input[k];
            },
            // Set the current value for the indicated input
            setState: function(k, v) {
                var update = {};
                update[k] = v;
                this.$store.commit('update', update);
            },
            // Trigger an update to the full query URL
            updateQuery: function() {
                var query = this.getQuery();
                this.$store.commit('updateQuery', query);
            }
        }
    };

/* Experiment, trying to separate out the base field decorations */
    Vue.component('input-wrapper', {
        props: ['options', 'uid', 'value'],
        template: '\
            <div class="form-group"> \
                <label :for="uid">{{ options.displayLabel }}:</label> \
                <input v-if="options.checkbox" v-model="checked" type="checkbox" /> \
                <slot>widget</slot> \
                <div class="help" v-if="options.helpText">{{ options.helpText }}</div> \
            </div> \
            ',
        computed: {
            // Get/set the checkbox state
            checked: {
                get: function() {
                    return this.value;
                },
                set: function(v) {
                    this.$emit('input', v);
                }
            }
        }
    });

    /*
    Vue.component('text-widget', {
        props: ['enabled', 'uid', 'value', 'placeholderText'],
        template: '\
          <input :disabled="!enabled" :id="uid" v-model="inputValue" \
            class="form-control" :placeholder="placeholderText"/> \
        ',
        computed: {
            inputValue: {
                get: function() {
                    return this.value;
                },
                set: function(v) {
                    this.$emit('input', v);
                    this.setStateValue(this.toStateValue(v));
                }
            }
        }
    });
    */

    Vue.component('test-input', {
        template: '\
            <input-wrapper :options="options" :uid="uid" v-model="checked"> \
              <input type="text" \
                class="form-control" :id="uid" \
                :disabled="!enabled" v-model="value" \
                :placeholderText="options.placeholderText" />\
            </input-wrapper> \
            ',
        mixins: [baseFieldMixin]
    });


    Vue.component('text-input', {
        template: '\
            <input-wrapper :options="options" :uid="uid" v-model="checked"> \
                <input type="text" \
                    class="form-control" :id="uid" \
                    :disabled="!enabled" v-model="value" \
                    :placeholderText="options.placeholderText" />\
            </input-wrapper> \
            ',
        mixins: [baseFieldMixin]
    });

    Vue.component('date-input', {
        template: '\
            <input-wrapper :options="options" :uid="uid" v-model="checked"> \
                <Flatpickr :disabled="!enabled" :id="uid" v-model="value" class="form-control" /> \
            </input-wrapper> \
            ',
        mixins: [baseFieldMixin],
        methods: {
            getFieldTypeOptions: function() {
                return {
                    toQueryValue: function(v) {
                        return v.replace(' ', 'T');
                    }
                };
            }
        }
    });

    Vue.component('choice-input', {
        template: '\
            <input-wrapper :options="options" :uid="uid" v-model="checked"> \
              <select :disabled="!enabled" :id="uid" v-model="value" class="form-control"> \
                <option v-for="choice in choices">{{ choice }}</option> \
              </select> \
            </input-wrapper> \
            ',
        mixins: [baseFieldMixin],
        computed: {
            choices: function() {
                return this.definition.enum;
            },

        }
    });

    Vue.component('boolean-input', {
        template: '\
            <input-wrapper :options="options" :uid="uid"> \
              <input :id="uid" v-model="value" type="checkbox" class="checkbox" value="true" /> \
            </input-wrapper> \
            ',
        mixins: [baseFieldMixin],
        methods: {
            getFieldTypeOptions: function() {
                return {
                    toQueryValue: function(v) {
                        return v ? "true" : "";
                    }
                };
            }
        }
    });

    Vue.component('field', {
        render: function(h) {
            return h('div', {
                'class': 'form-group'
            }, [
                'Test'
            ]);
        },
        render2: function(h) {
            var self = this;
            var checkbox = '';
            if (this.checkbox) {
                checkbox = h('input', {
                    attrs: {
                        type: 'checkbox'
                    },
                    domProps: {
                        value: self.checked
                    },
                    on: {
                        input: function(e) {
                            self.checked = e.target.value;
                        }
                    }
                });
            }
            var input = h('input', {
                attrs: {
                    type: 'text',
                    id: self.uid
                },
                domProps: {
                    value: self.value
                },
                on: {
                    input: function(e) {
                        self.value = e.target.value;
                    }
                }
            });
            return h('div', {
                'class': 'form-group'
            }, [
                h('label', {
                    attrs: {
                        'for': self.uid
                    }
                }, [
                        self.displayLabel
                    ]
                ),
                checkbox,
                input
            ]);
        },
        mixins: [baseFieldMixin]
    });

    Vue.component('radio-group', {
        props: ['label'],
        template: '\
            <div class="option"> \
                <label><input type="radio" :name="radioName" v-model="checked" value="true" /> {{ label }}</label> \
                <slot>inputs</slot> \
            </div> \
            ',
        data: function() {
            return {
                checked: false,
                radioName: this.$parent.radioName
            };
        },
        computed: {
        },
        methods: {
            getQuery: function() {
                var query = {};
                if (this.checked) {
                    this.$children.forEach(function(child) {
                        $.extend(query, child.getQuery());
                    });
                }
                return query;
            },
        }
    });

    Vue.component('radio-groups', {
        template: '\
            <div class="options"> \
                <slot>options</slot> \
            </div> \
            ',
        data: function () {
            return {
                radioName: 'radio-' + Math.random()
            };
        },
        computed: {
        },
        methods: {
            getQuery: function() {
                var query = {};
                this.$children.forEach(function(child) {
                    $.extend(query, child.getQuery());
                });
                return query;
            }
        },
        mounted: function() {
            var radioName = this.radioName;
            this.$children.forEach( function(child) {
                child.radioName = radioName;
            });
        }
    });

    Vue.component('default-form', {
        props: ['definition'],
        template: '\
            <div> \
                {{ form }} \
            </div> \
        ',
        computed: {
            form: function() {
                var params = this.definition.params;
                return $.map(this.definition.parameterNames, function(p) {
                    return '<text-input name="' + p + '"></text-input>';
                }).join("\n");
            }
        }
    });



    /* The default escape (from $.param) overescapes things, so undo some
     */
    function friendlyURL(url) {
        // TODO: probably more substitutions should be here
        return url.replace(/%3A/g, ':');
    }

    Vue.component('query-link', {
        template: '\
            <div class="query"> \
                <a :href="url">{{ prettyURL }}</a> \
            </div> \
        ',
        props: ['url'],
        computed: {
            prettyURL: function() {
                return this.url.replace(/(\?|\&)/g, ' $& ');
            }
        },
        methods: {
            affix: function() {
                $('.query').affix({
                  offset: {
                    top: $('.query').offset().top,
                    bottom: $('footer').outerHeight(true) + 40
                  }
                });
            }
        }
    });

    /**
     * Default builder options
     */
    var DEFAULTS = {
        /* URL to retrieve Swagger definition from */
        swaggerURL: 'example/swagger-event.json',
        /* Swagger path to generate a builder for */
        path: '/query',
        /* Method (eg. "get" or "post") to generate a builder for */
        method: 'get',
        /* jQuery selector to get the form to work on */
        form: 'form',
        /* Bootstrap form classes */
        labelClass: 'col-xs-2',
        fieldClass: 'col-xs-10',
        /* Where to show parameter help text, options are 'inline', 'dialog', 'inline,dialog' or '' */
        showHelpText: 'dialog'
    };

    /**
     * Main builder object.
     * @param options : a dictionary of options, supplementing/overriding DEFAULTS
     */

//    return {
//        Parameter: Parameter,
//        DateParameter: DateParameter,
//        DateTimeParameter: DateTimeParameter,
//        Columns: Columns,
//        OptGroup: OptGroup,
//        CoordinateBox: CoordinateBox,
//        CoordinateRadius: CoordinateRadius,
//        Fieldset: Fieldset,
//        Builder: Builder
//    };

        Vue.component('builder', {
            // Main page template
            template: '\
                <div v-if="ready"> \
                    <h2>{{ serviceDefinition.title }}</h2> \
                    <p>{{ serviceDefinition.description }}</p> \
                    <form class="form-inline"> \
                        <slot><default-form :definition="operationDefinition"></default-form></slot> \
                    </form> \
                    <query-link :url="queryURL"></query-link> \
                </div> \
                <div v-else> \
                    <div v-if="error" class="error"> \
                        {{ error }} \
                    </div> \
                    <div v-else> \
                        Loading... \
                    </div> \
                </div> \
            ',
            props: ['definition', 'path', 'method'],
            data: function() {
                return {};
            },
            computed: {
                // Is everything loaded and ready to go
                ready: function() {
                    return !!this.$store.state.definition.service;
                },
                // Service definition from JSON (empty if not ready)
                serviceDefinition: function() {
                    return this.ready ? this.$store.state.definition.service : {};
                },
                // Operation definition from JSON (empty if not ready)
                operationDefinition: function() {
                    return this.ready ? this.$store.state.definition.operation : {};
                },
                // Full URL path for the query (eg. '/fdsnws/event/1/query')
                queryPath: function() {
                    return this.serviceDefinition.basePath + this.serviceDefinition.path;
                },
                // List of query parameters
                queryParams: function() {
                    return friendlyURL($.param(this.$store.state.query || []));
                },
                // Full query URL
                queryURL: function() {
                    return "" + this.queryPath + "?" + decodeURI(this.queryParams);
                },
                // The current error message, if one exists
                error: function() {
                    return this.$store.state.error;
                }
            },
            mounted: function() {
                // Initialize when mounted
                builder({
                   definition: this.definition,
                   path: this.path || '/query',
                   method: this.method || 'get'
                });
            }
        });

        // Simple Vuex store
        var storeOptions = {
            state: {
                query: {},
                input: {},
                definition: {},
                options: {},
                error: null
            },
            mutations: {
                updateQuery: function(state, data) {
                    // Update the service query URL
                    var query = $.extend({}, state.query, data);
                    for (var k in query) {
                        if (query[k] === "") {
                            delete query[k];
                        }
                    }
                    state.query = query;
                },
                update: function(state, data) {
                    // Update the state of the form inputs
                    state.input = $.extend({}, state.input, data);
                },
                setOptions: function(state, options) {
                    state.options = options;
                },
                load: function(state, definition) {
                    // Load a JSON definition
                    state.definition = definition;
                },
                error: function(state, error) {
                    // Enter (or clear) the error state
                    state.error = error;
                }
            }
        };
        var store = new Vuex.Store(storeOptions);

        var exampleOptions = {
            magtype: {
                displayLabel: "Magnitude Type"
            },
            mindepth: {
                placeholderText: "meters"
            }
        };
        store.commit('setOptions', exampleOptions);

        function loadDefinition(options) {

            /* Convert swagger data to a flatter format
             * definition.service = "service" level information combining
             *  the Swagger JSON with some local settings
             * definition.operation = the Swagger JSON for this builder's
             *  Operation (each builder handles just one Operation, but
             *  the Swagger JSON may define many).
             */

            function parseSwaggerData(data) {
                var definition = {
                    service: {
                        title: data.info.title,
                        description: data.info.description,
                        host: data.host,
                        basePath: data.basePath,
                        path: options.path
                    }
                };
                // Extract the operation-level definition and parse that separately
                var pathData = data.paths[options.path];
                if (!pathData) {
                    throw "Invalid service path given: " + options.path;
                }
                var operation = pathData[options.method];
                if (!operation) {
                    throw "Method " + options.method + " is not defined for " + options.path;
                }
                definition.operation = parseSwaggerOperation(operation);
                return definition;
            }

            function parseSwaggerOperation(operationData) {
                var operation = {
                    summary: operationData.summary,
                    description: operationData.description,
                    // List of parameter names, this is mostly to preserve the ordering
                    parameterNames: [],
                    // Information about each parameter
                    params: {}
                };
                $.each(operationData.parameters, function(_i, param) {
                    // Only handle the query parameters
                    if (param.in == 'query') {
                        operation.parameterNames.push(param.name);
                        operation.params[param.name] = param;
                    }
                });
                return operation;
            }

            // Load the Swagger definition
            return $.ajax(options.definition).then(
                // OK, parse the definition
                function(data) {
                    return parseSwaggerData(data);
                },
                // Error, consolidate into a single value
                function(jqXHR, status, error) {
                    throw (error || status);
                }
            );
        }
        window.loadDefinition = loadDefinition;

        function builder(options) {

            /* Note that this is written for jQuery 3.0, which changed how Deferreds work */

            // Load the Swagger definition
            return loadDefinition(options).then(
                // Store the parsed definition
                function(definition) {
                    irisUtil.Log.debug("Success");
                    store.commit('load', definition);
                },
                // Error
                function(error) {
                    irisUtil.Log.error("Error: " + error);
                    store.commit('error', error);
                }
            );
        }

        irisUtil.Log.setLevel('debug');
        $(function() {
            window.vueWidget = new Vue({
                el: '#builder',
                store
            });
        });
}));
