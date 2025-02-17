const Card = ({ image, name }) => {
    return (
        <div className="text-center">
            <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-full mx-auto"
            />
            <p className="text-sm font-medium mt-2 text-black">{name}</p>
        </div>
    );
};

export default Card;