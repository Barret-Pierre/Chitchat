const Image = ({ url, alt }) => {
    return (
        <div className="img">
            <img src={url} alt={alt} />
        </div>
    );
};

export default Image;