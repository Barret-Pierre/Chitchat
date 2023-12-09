import './Avatar.css'

const Avatar = ({ size, url, name, connected }) => {
    return (
        <div className={`avatar avatar--${size} ${connected ? 'avatar--connected' : ''}`}>
            <img src={url} alt={name} />
        </div>
    );
};

export default Avatar;