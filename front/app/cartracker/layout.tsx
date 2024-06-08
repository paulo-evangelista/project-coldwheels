import { GeistSans } from "geist/font/sans";
import "../globals.css"

export default async function Layout({children}) {

  return (
    <>  
      <div className={GeistSans.className}>
        {children}
      </div>
    </>
  );
}
