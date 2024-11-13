import React, { Suspense } from "react";
const Todos = React.lazy(() => import("widjets/todos/ui/Todos"));

export const MainPage = () => {
    
    return <>
        <Suspense fallback={<Todos skeleton={true}/>}>
            <Todos skeleton={false}/>
        </Suspense>
    </>
}