interface Props {
    title?: string;
    description?: string;
}

export default function FormHeader({ title, description } : Props) {
    return (
        <div className="flex flex-col w-full gap-2">
            <h2 className="text-2xl flex self-center text-center w-fit font-semibold">{title}</h2>
            {description && <p className="text-center text-sm px-4">{description}</p>}
        </div>
    );
}
