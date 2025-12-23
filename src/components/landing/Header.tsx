import landingBg from '../../assets/images/backgrounds/landingBg.png';

export default function Header() {
  return (
    <header>
      <div className='headerText'>
        <h1 className='companyName'>LearnForge</h1>
        <p className='slogan'>Обучай как <em>ты</em> хочешь</p>
      </div>
      <img src={landingBg} alt='Background image' />
    </header>
  );
}