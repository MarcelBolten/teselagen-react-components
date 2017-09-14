import { graphql } from "react-apollo";
import { gql } from "react-apollo";
import pluralize from "pluralize";
import { get, upperFirst } from "lodash";

/**
 * withQuery 
 * @param {string | gql fragment} nameOrFragment supply either a name or a top-level fragment
 * @param options 
 *    @param {boolean} isPlural - are we searching for 1 thing or many?
 *    @param {string} queryName - what the props come back on ( by default = modelName + 'Query')
 *    @param {boolean} asFunction - if true, this gives you back a function you can call directly instead of a HOC
 *    @param {boolean} asQueryObj - if true, this gives you back the gql query object aka gql`query myQuery () {}`
 *    @param {string} idAs - by default single record queries occur on an id. But, if the record doesn't have an id field, and instead has a 'code', you can set idAs: 'code'
 *    @param {boolean} getIdFromParams - grab the id variable off the match.params object being passed in!
 
 * @return props: {xxxxQuery, data }
 */
export default function withQuery(nameOrFragment, options = {}) {
  const {
    isPlural,
    queryName,
    asFunction,
    asQueryObj,
    idAs,
    client,
    variables,
    getIdFromParams,
    ...rest
  } = options;
  const fragment = typeof nameOrFragment === "string" ? null : nameOrFragment;
  const name = fragment
    ? fragment.definitions[0].typeCondition.name.value
    : nameOrFragment;
  // const {fragment, extraMutateArgs} = options
  const fragName = fragment && fragment.definitions[0].name.value;
  const nameToUse = queryName || (isPlural ? pluralize(name) : name);
  const queryNameToUse = nameToUse + "Query";
  // const pascalNameToUse = pascalCase(nameToUse)
  const queryInner = `${fragName ? `...${fragName}` : idAs || "id"}`;
  /* eslint-disable */
  let gqlQuery;
  if (isPlural) {
    gqlQuery = gql`
      query ${queryNameToUse} ($pageSize: Int $sort: [String] $filter: JSON $pageNumber: Int {
        ${nameToUse}(pageSize: $pageSize, sort: $sort, filter: $filter, pageNumber: $pageNumber) {
          results {
            ${queryInner}
          }
          totalResults
        }
      }
      ${fragment ? fragment : ``}
    `;
  } else {
    gqlQuery = gql`
      query ${queryNameToUse} ($${idAs || "id"}: String!) {
        ${nameToUse}(${idAs || "id"}: $${idAs || "id"}) {
          ${queryInner}
        }
      }
      ${fragment ? fragment : ``}
    `;
  }

  /* eslint-enable */
  if (asQueryObj) {
    return gqlQuery;
  }
  if (asFunction) {
    return function query(localVars) {
      return client
        .query({
          query: gqlQuery,
          name: "createDataFile",
          variables: localVars || variables || rest.options.variables
        })
        .then(function(res) {
          return Promise.resolve(res.data[nameToUse].results);
        });
    };
  }

  return graphql(gqlQuery, {
    //default options

    options: props => {
      const { variables, ...rest } = props;
      if (getIdFromParams) {
        const id = parseInt(get(props, "match.params.id"), 10);
        if (!id) {
          console.log(
            "There needs to be an id passed here to ",
            queryNameToUse,
            "but none was found"
          );
          /* eslint-disable */
          debugger;
          /* eslint-enable */
        }
        return {
          variables: {
            id
          }
        };
      }
      return {
        variables,
        ...rest
      };
    },
    props: ({ data }) => {
      const results = get(data, nameToUse + (isPlural ? ".results" : ""));
      const totalResults = isPlural
        ? get(data, nameToUse + ".totalResults", 0)
        : results && 1;
      const newData = {
        ...data,
        totalResults,
        //adding these for consistency with withItemsQuery
        entities: results,
        entityCount: totalResults,
        ["error" + upperFirst(nameToUse)]: data.error,
        ["loading" + upperFirst(nameToUse)]: data.loading
      };
      return {
        data: newData,
        [queryNameToUse]: newData,
        [nameToUse]: results,
        [nameToUse + "Error"]: data.error,
        [nameToUse + "Loading"]: data.loading,
        [nameToUse + "Count"]: results
      };
    },
    ...rest //overwrite defaults here
  });
}
