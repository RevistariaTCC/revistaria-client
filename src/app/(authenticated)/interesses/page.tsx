import Card from "@/app/components/Card";
import InterestCard from "./components/InterestCard";

export default function Interesses() {
    return(
        <div>
            <div className="grid justify-center mt-40 mx-32">
                <div className="text-center mb-10 text-2xl">
                    Selecione seus interesses!
                </div>
                <div className="flex justify-center border gap-1">
                    <InterestCard> Ação </InterestCard>
                    <InterestCard> Auto Ajuda </InterestCard>
                    <InterestCard> Ficção </InterestCard>
                    <InterestCard> Anime </InterestCard>
                    <InterestCard> HQ </InterestCard>
                    <InterestCard> Ficção </InterestCard>
                    <InterestCard> Revistas </InterestCard>

                </div>
            </div>
        </div>
    )
};
