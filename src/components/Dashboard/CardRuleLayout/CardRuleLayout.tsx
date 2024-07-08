import React from "react";
import "./CardRuleLayout.scss";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  title: string;
};

function CardRuleLayout({ children, title }: Props) {
  return (
    <section className="cardRuleLayout">
      <section className="cardRuleLayout__subContainer">
        <section className="cardRuleLayout__subContainer--title">
          <Image
            src="/golden-trophy-white-background.png"
            height={60}
            width={60}
            alt="grass"
          />
          <section>
            <h2>{title}</h2>
          </section>
        </section>
        {children}
      </section>
    </section>
  );
}

export default CardRuleLayout;
