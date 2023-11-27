import { GitHub } from "@mui/icons-material";
import { Container } from "@mui/material";

export default function Footer() {
    return (
        <footer className="mt-16 pb-2 flex bg-[#121212] w-full">
            <Container className="text-white flex flex-col">
                <div className="grid cell:grid-cols-1 md:grid-cols-3 justify-items-center gap-4">
                    <div className="grid">
                        <h3>LINKS UTEIS</h3>
                        <div className="text-center grid justify-center gap-2">
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
                    </div>
                    <div>
                        <h3>DESENVOLVEDORES</h3>
                        <div className="grid justify-center gap-2">
                            <span>Alan P.</span>
                            <span>Luan Lima</span>
                            <span>Samuel Meira</span>
                        </div>
                    </div>
                    <div>
                        <h3>CONTATO</h3>
                        <div className="grid justify-center gap-2">
                            <span>email alan</span>
                            <span>email luan</span>
                            <span>email samuel</span>
                        </div>
                    </div>
                </div>
                <div className="my-4 flex justify-center ">
                    <div>
                        © 2023 Copyright: revistaria.com
                    </div>
                </div>
            </Container>
        </footer>
    )
};
