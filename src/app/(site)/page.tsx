import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/app/(site)/components/PageContent";

export default function Home() {
  return (
    <main className="bg-neutral-900 h-full w-full rounded-lg overflow-hidden overflow-y-auto">
      <Header>
        <div className={"mb-2"}>
          <h1 className={"text-white text-3xl font-bold"}>Welcome back</h1>

          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"
            }
          >
            <ListItem
              image={"/images/liked.png"}
              name={"Liked Songs"}
              href={"liked"}
            />
          </div>
        </div>
      </Header>

      <div className={"mt-2 mb-7 px-6"}>
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-white text-2xl font-bold"}>Newest song</h1>
        </div>

        <PageContent />
      </div>
    </main>
  );
}