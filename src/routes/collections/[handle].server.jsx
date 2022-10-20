import { 
    gql,
    useShopQuery,
    useRouteParams,
    Seo,
    useServerAnalytics,
    ShopifyAnalyticsConstants,
} from "@shopify/hydrogen";

import { Suspense } from "react";

import { Layout } from "../../components/Layout.server";

export default function Collection() {
    const { handle } = useRouteParams();

    const {
        data: { collection },
    } = useShopQuery({
        query: QUERY,
        variables: {
            handle,
        },
    });

    useServerAnalytics({
        shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.collection,
            resourceId: collection.id,
        },
    });

    return (
        <Layout>

            {/* <section className="p-6 md:p-8 lg:p-12">
                This will be the collection page for <strong>{collection.title}</strong>
            </section> */}
            
            <Suspense>
                <Seo type="collection" data={collection} />
            </Suspense>

            <header className="grid w-full gap-8 p-4 py-8 md:p-8 lg:p-12 justify-items-start">
                <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
                    {collection.title}
                </h1>

                {collection.description && (
                <div className="flex items-baseline justify-between w-full">
                    <div>
                        <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                            {collection.description}
                        </p>
                    </div>
                </div>
                )}
            </header>
            
        </Layout>
    );
}

// GraphQL query to retrieve collection by handle name

// const QUERY = gql`
//   query CollectionDetails($handle: String!) {
//     collection(handle: $handle) {
//       title
//     }
//   }
// `;

// Seo component will use collections' seo values when specified. Seo component must be wrapped within collection query
const QUERY = gql`
    query CollectionDetails($handle: String!) {
        collection(handle: $handle) {
            id
            title
            description
        seo {
            description
            title
        }
    }
}`;