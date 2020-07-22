import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

// TODO: check src
const Blog = ({ data }) => {
    console.log(data);
    return (
        <>
            <h2 className="text-xl uppercase font-bold text-grey-cool-900">Latest Posts</h2>
            {data.map(el => {
                const {
                    title,
                    featured_image,
                    _meta: { uid },
                } = el.node;
                return (
                    <Link key={uuidv4()} href={`/blog/${uid}`}>
                        <a className="flex justify-center items-center py-4 text-grey-cool-800">
                            {/* <div className="rounded-full w-2/7 h- overflow-hidden relative"> */}
                            <img
                                className="object-cover object-center rounded-50% w-16 h-16 mr-4"
                                src={featured_image.url}
                                alt={featured_image.alt}
                            />
                            {/* </div> */}
                            <div>
                                <h3 className="text-md tracking-wide">{title[0].text}</h3>
                                {/* <p className="text-sm font-tertiary text-gray-600">{subtitle}</p> */}
                            </div>
                        </a>
                    </Link>
                );
            })}
        </>
    );
};

export default Blog;
