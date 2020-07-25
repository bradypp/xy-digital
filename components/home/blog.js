import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { linkResolver, hrefResolver } from 'utils/prismic';

const Blog = ({ data }) => (
    <>
        <h2 className="title font-tertiary uppercase text-grey-cool-800 text-xl font-bold">
            Latest Posts
        </h2>
        {data.map(el => {
            const { title, featured_image, _meta } = el.node;
            return (
                <Link key={uuidv4()} as={linkResolver(_meta)} href={hrefResolver(_meta)}>
                    <a className="flex justify-start items-center my-4 text-grey-cool-800">
                        <img
                            className="object-cover object-center rounded-50% w-16 h-16 mr-4 shadow"
                            src={featured_image.url}
                            alt={featured_image.alt}
                        />
                        <div>
                            <h3 className="text-sm font-tertiary font-bold tracking-tight">
                                {title[0].text}
                            </h3>
                        </div>
                    </a>
                </Link>
            );
        })}
    </>
);

export default Blog;
