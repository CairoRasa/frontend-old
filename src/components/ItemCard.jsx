import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

export default function ItemCard({image, id, tags, name, description}) {
    return (
        <Link to={`/${id}`}>
            <div className="w-auto shadow-xl card bg-base-100">
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
                    <div className="justify-end card-actions">
                        {tags &&
                            tags.map((t, idx) => {
                                return <div key={idx} className="badge badge-outline">{t}</div>;
                            })}
                    </div>
                </div>
            </div>
        </Link>
    );
}
