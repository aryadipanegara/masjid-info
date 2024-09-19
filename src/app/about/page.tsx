import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Tentang Masjidinfo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-semibold text-center">
            Assalamualaikum wr.wb
          </p>

          <div className="space-y-4">
            <p>
              masjidinfo.net adalah pengalihan dari bujangmasjid.blogspot.com
              di-dedikasikan sebagai gudang informasi masjid di Indonesia dan
              dunia. Beberapa masjid memang pernah kami kunjungi langsung namun
              sebagian dikompilasi dari berbagai sumber di media massa termasuk
              intenet, penerbitan dan sebagainya, sebagai kontribusi yang dapat
              kami berikan bagi dakwah Islam.
            </p>
            <p>
              Dipersilahkan untuk menyalin atau disebarluaskan bagi kepentingan
              dakwah Islam, bukan untuk kepentingan bisnis. Patuhi Etika dan
              Tata Krama, dengan menyebutkan sumber anda dari blog ini.
            </p>
            <p>
              Semoga kita disempatkan mewujudkan mimpi memenuhi panggilan ilahi
              untuk datang ke Masjidil Haram, Masjid Nabawi di Madinah guna
              menunaikan ibadah Umroh & Haji bersama orang orang tercinta. Dan
              diberikan kesempatan mengununjungi kiblat pertama "Masjidil Aqso
              di Palestina", dan ketika saat itu tiba, Palestina sudah kembali
              ke pangkuan Islam.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Kontribusi
            </h2>
            <p className="mb-4">
              Kamu dapat menyumbangkan naskah tulisan menarikmu tentang masjid
              dan dunia Islam dilengkapi dengan foto foto menarik dan sumber
              sumber terpercaya.
            </p>
            <p className="mb-4">
              Bila cukup menarik akan kami muat dengan mencantumkan nama-mu
              sebagai penulis atau narasumber. Naskah dapat dikirimkan melalui
              email ke{" "}
              <a
                href="mailto:bujanglanang@gmail.com"
                className="text-primary hover:underline"
              >
                bujanglanang@gmail.com
              </a>
            </p>
            <p>
              Kamu juga dapat berkontribusi aktif untuk turut menjaga
              kelangsungan domain masjidinfo.net dengan scanning barcode di
              bawah ini.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold">Scan untuk Donasi</h3>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUrtek7gf4ZysDfbJloVgihiZqU_js70_QNJomOkakLyeByjvBuJa2TOAd6uTcX14sv5CFVNrEmWQX_7ttt7xVnkmasrjl0LfJAyr8UNmdRqLkbtlDHdu6vn0YW7S950sChVN313PtytGgzgdwmthpen2CdfJt3HfVoIAKrDGxS3mwLna2MQVeIwNm/w160-h200/qris-masjidinfo.jpg"
              alt="QR Code untuk Donasi"
              className="w-48 h-48"
            />
            <p className="text-sm text-muted-foreground">
              Scan QR code di atas untuk melakukan donasi
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold">Ikuti Kami di Instagram</h3>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Instagram className="w-5 h-5" />
                <span>@masjidinfo</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Instagram className="w-5 h-5" />
                <span>@masjidinfo.id</span>
              </Button>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="font-semibold">Jazakallah Khairan Katsiran</p>
            <p>Wassalamualaikum wr.wb</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
