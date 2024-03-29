import React from 'react';
const ItemCard = React.lazy(() => import('./ItemCard'));

export default function ItemGrid({ data }) {
    return (
        <div className="p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
                {data && (data.length > 0) && data.map(d => {
                    return (
                        <React.Suspense key={d._id} fallback={<>...</>}>
                            <ItemCard
                                image={d.image}
                                name={d.name}
                                id={d._id}
                                // description={d.description}
                                tags={d.tags}
                            />
                        </React.Suspense>
                    )
                })}
            </div>
        </div>
    );
}
