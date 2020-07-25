import { RichText } from 'prismic-reactjs';

// TODO: styling
const BlockQuote = ({ slice }) => (
    <div className="">
        <blockquote className="">{RichText.asText(slice.primary.quote)}</blockquote>
    </div>
);

export default BlockQuote;
