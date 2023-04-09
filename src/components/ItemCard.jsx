import ReactMarkdown from "react-markdown";

export default function ItemCard({image, id, tags, name, description}) {
    return (
        <a href={`/${id}`}>
            <div className="card w-auto bg-base-100 shadow-xl">
                <figure>
                    <img src={image} alt="Food Image"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p className="overflow-hidden">
                        <ReactMarkdown>
                            {description}
                        </ReactMarkdown>
                    </p>
                    <div className="card-actions justify-end">
                        {tags &&
                            tags.map((t, idx) => {
                                return <div key={idx} className="badge badge-outline">{t}</div>;
                            })}
                    </div>
                </div>
            </div>
        </a>
    );
}
