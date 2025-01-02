import Link from "next/link";

/**
 * @param {object} props - the props containing the details of the person
 * @param {string} props.name - the name of the person
 * @param {string} props.role - the role of the person
 * @param {string} props.picture - the picture of the person
 * @param {string} props.profile_url - the profile url of the person
 * @returns {JSX.Element} - the article card component
 */

interface CardNameProps {
  name: string;
  role: string;
  picture: string;
  profile_url: string;
}

export default function CardName({
  name,
  role,
  picture,
  profile_url,
}: CardNameProps) {
  return (
    <Link
      href={profile_url}
      className="rounded-xl flex flex-col items-center justify-center border-2 border-coreBlue-100 gap-3 bg-coreBlue-50 shadow-xl hover:outline hover:outline-coreBlue-500 hover:outline-offset-2"
    >
      <div className="relative h-full flex flex-col gap-2 overflow-hidden p-5 text-center">
        <div className="w-full h-60 rounded">
          <img
            src={picture}
            alt="profile"
            className="h-60 p-4 rounded-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold">{name}</h2>
        {/* show the role */}
        <p>{role}</p>
      </div>
    </Link>
  );
}
