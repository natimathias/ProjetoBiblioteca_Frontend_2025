import { NavLink } from "react-router-dom";

export function Menu() {

    return (
        <aside className="w-screen h-screen flex">
            <header className="flex-col justify-center items-center bg-teal-200 w-1/5 h-full">
                <span className="font-bold">Biblioteca Online</span>
            </header>

            <main className="flex flex-col w-4/5 h-full">
                <div className="bg-teal-400 h-1/5 w-full"></div>
                <img className="h-4/5 " src="/pagPrincipal.svg" alt="" />
            </main>


            {/* <header className="bg-teal-400 h-1/6 w-4/5"></header>

            <main className="flex-col bg-slate-400 w-full h-4/6">
                <div className="bg-teal-200 w-1/5 h-full"></div>
            </main>

            <footer className="bg-teal-400 h-1/6 w-4/5"></footer> */}
        </aside>
    )
}
