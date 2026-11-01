import { imageCredits } from '../data/imageCredits';

export function CreditsPage() {
  return (
    <>
      <title>مصادر الصور | ChilloCafé</title>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <h1>مصادر الصور وتراخيصها</h1>
          <p>صور الموقع مأخوذة من ويكيميديا كومنز، وقد جرى قصّها وتغيير حجمها، وتبقى خاضعة لتراخيصها الأصلية.</p>
        </div>
      </section>
      <section className="section section--tight container">
        <div className="credits-table">
          <table>
            <thead>
              <tr>
                <th scope="col">الملف</th>
                <th scope="col">المصدر</th>
                <th scope="col">صاحب العمل</th>
                <th scope="col">الترخيص</th>
              </tr>
            </thead>
            <tbody dir="ltr">
              {imageCredits.map((credit) => (
                <tr key={credit.file}>
                  <td>{credit.file}</td>
                  <td>
                    <a href={credit.source} target="_blank" rel="noreferrer">
                      {credit.title}
                    </a>
                  </td>
                  <td>{credit.artist}</td>
                  <td>{credit.licenseUrl ? <a href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a> : credit.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
