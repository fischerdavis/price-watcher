import { api } from "@/utils/api";
import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useState } from "react";

export default function Home() {
  const { data: links = [], isLoading, error } = api.link.getAll.useQuery();

  const context = api.useUtils();

  const [link, setLink] = useState("");

  const addLink = api.link.addLink.useMutation({
    onSuccess: () => {
      void context.link.getAll.invalidate();
      setLink("");
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  const onAddClick = () => {
    if (!link.length) return;
    addLink.mutate({ link });
  };

  return (
    <RootLayout>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] items-start gap-2">
          <Input
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button onClick={onAddClick}>Add</Button>
        </div>
        <div>
          {links.map((link) => (
            <div key={link.id} className="flex gap-2">
              <div>{link.name}</div>
              <div>{link.link}</div>
              <div>{link.price}</div>
              <div>{link.change}</div>
            </div>
          ))}
        </div>
      </section>
    </RootLayout>
  );
}
