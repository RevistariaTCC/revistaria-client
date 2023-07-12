import Card from "@/app/components/Card";
import InterestCard from "./components/InterestCard";

export default function Interesses() {
    return(
        <div>
            <div className="grid justify-center mt-40 mx-32">
                <div className="text-center mb-10 text-2xl font-bold text-[#333f57]">
                    Selecione seus interesses!
                </div>
                <div className="flex flex-wrap md:grid-cols-6 justify-center gap-1 max-w-[950px]">
                    <InterestCard> Ação </InterestCard>
                    <InterestCard> Auto Ajuda </InterestCard>
                    <InterestCard> Ficção </InterestCard>
                    <InterestCard> Anime </InterestCard>
                    <InterestCard> HQ </InterestCard>
                    <InterestCard> Ficção </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>
                    <InterestCard> Revistas </InterestCard>


                </div>
            </div>
        </div>
    )
};
