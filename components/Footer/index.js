export default function Footer() {
  return (
    <div className="mt-10 ml-10">
      <h3 className="text-sm text-gray-400 truncate">
        &copy; {new Date().getFullYear()} MADE WITH{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        BY SHANE LE
      </h3>
    </div>
  );
}
