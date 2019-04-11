declare module '*.gql' {
    import { DocumentNode } from 'graphql';
    export = DocumentNode;
}

declare module '*.graphql' {
    import { DocumentNode } from 'graphql';
    export = DocumentNode;
}
