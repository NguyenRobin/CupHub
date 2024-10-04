import React from "react";
import "./CardRule.scss";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  title: string;
};

function CardRule({ children, title }: Props) {
  return (
    <section className="card-rule">
      <section className="card-rule__info">
        <section className="card-rule__info--title">
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
      </section>

      <section className="card-rule__children">{children}</section>
    </section>
  );
}

export default CardRule;
