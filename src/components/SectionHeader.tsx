export const SectionHeader = ({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) => {
  return (
    <>
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text text-center">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-serif text-3xl text-center mt-6">{title}</h2>
      <p className="  text-xl text-center text-white/60 md:text-lg lg:text-xl mt-4 max-w-md mx-auto">
        {description}
      </p>
    </>
  );
};
