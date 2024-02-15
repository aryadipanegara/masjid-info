import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";

const categoriesData = [
  { country: "Arabia" },
  { country: "Brunei" },
  { country: "Indonesia" },
  { country: "Malaysia" },
];

export default function Category({ active, onClick }) {
  return (
    <Tabs value={active} onChange={(value) => onClick(value)}>
      <TabsHeader>
        {categoriesData.map(({ country }) => (
          <Tab key={country} value={country}>
            <Typography>{country}</Typography>
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
