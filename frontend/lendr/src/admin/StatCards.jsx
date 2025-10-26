import React from "react";
import { IconRestore, IconBasketSearch, IconFocus2, IconShoppingCartExclamation } from "@tabler/icons-react";

const StatCards = () => {
  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          title="Total Items"
          subtitle="24"
          Icon={IconBasketSearch}
          color="green"
        />
        <Card title="To Restock" subtitle="10" Icon={IconRestore} color="orange" />
        <Card title="Requested" subtitle="15" Icon={IconFocus2} color="blue" />
        <Card
          title="Not Returned"
          subtitle="05"
          Icon={IconShoppingCartExclamation}
          color="red"
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, color }) => {
  // Map simple color names to Tailwind text color classes so hover utilities can override them
  const colorMap = {
    green: "text-emerald-600",
    orange: "text-amber-500",
    blue: "text-sky-500",
    red: "text-rose-500",
  };

  const colorClass = colorMap[color] || "text-slate-900";

  return (
    <a
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
    <div className="flex flex-row items-center gap-4 relative">
      <Icon className="absolute z-10 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className={`mb-2 text-2xl ${colorClass} group-hover:text-white transition-colors relative z-10 duration-300`} />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className={`${colorClass} font-bold text-xl relative z-10 group-hover:text-white duration-300`}>
        {subtitle}
      </p>
      </div>
    </a>
  );
};

export default StatCards;