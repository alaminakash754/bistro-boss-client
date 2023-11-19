
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center w-4/12 mx-auto my-6">
            <p className="italic text-yellow-600 mb-2">--{subHeading}--</p>
            <h2 className="uppercase text-3xl border-y-4 py-3">{heading}</h2>
        </div>
    );
};

export default SectionTitle;