import { GitHub } from "@mui/icons-material";
import { Container } from "@mui/material";

export default function Footer() {
    return (
        <footer className="mt-16 pb-2 flex bg-[#121212] w-full justify-center">
            <Container className="text-white grid md:grid-cols-3 justify-center justify-items-center">
                <div className="grid">
                    <h3>LINKS UTEIS</h3>
                    <span className="flex items-center ">
                        <GitHub className="fill-white me-1"/> 
                        Github
                    </span>
                    <span className="flex items-center me-1">
                        <GitHub className="fill-white me-1"/> 
                        Github
                    </span>
                    <span className="flex items-center me-1">
                        <GitHub className="fill-white me-1"/> 
                        Github
                    </span>
                </div>
                <div>
                    <h3>DESENVOLVEDORES</h3>
                    <p>Alan P.</p>
                    <p>Luan Lima</p>
                    <p>Samuel Meira</p>
                </div>
                <div className='grid'>
                    <h3>CONTATO</h3>
                    <span>email alan</span>
                    <span>email luan</span>
                    <span>email samuel</span>
                </div>
                <div className="col-span-3 flex justify-center ">
                    <div>
                        © 2023 Copyright: revistaria.com
                    </div>
                </div>
            </Container>
        </footer>
    )
};
