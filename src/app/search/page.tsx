import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/search/components/SearchContent";

interface SearchProps {

}

export default function Search() {
    return (
        <div className={'bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto'}>
            <Header className={'from-bg-neutral-900'}>
                <div className={'mb-2 flex flex-col gap-y-6'}>
                    <h1 className={'text-3xl font-bold text-white'}>Search</h1>

                    <SearchInput />
                </div>
            </Header>

            <SearchContent songs={[]} />
        </div>
    )
}