import React from 'react';
import Icon from 'components/ui/Icon';

// Components
import Filters from 'containers/app/Filters';
import WidgetList from 'containers/widgets/WidgetList';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerToggle = this.triggerToggle.bind(this);

    this.state = {
      opened: true
    };
  }

  /**
   * UI EVENTS
   * - triggerToggle
  */
  triggerToggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const openedClass = (this.state.opened) ? '-opened' : '';

    return (
      <div className={`l-sidebar c-sidebar ${openedClass}`}>
        {/*
          Toggle button
          - I'm using a div instead of a button because I don't want that browser's styles interfere with it
        */}
        <div className={`l-sidebar-toggle btn-toggle ${openedClass}`} onClick={this.triggerToggle}>
          <Icon className="-medium" name="icon-arrow-left" />
        </div>

        {/* Filters */}
        <div className="l-filters">
          <Filters />
        </div>

        {/* Widget List */}
        <div className="l-sidebar-content">
          {/* <WidgetList /> */}
          <div style={{ padding: 16, color: '#000' }}>
            <p>Reina en mi espíritu una alegría admirable, muy parecida a las dulces alboradas de la primavera, de que gozo aquí con delicia. Estoy solo, y me felicito de vivir en este país, el más a propósito para almas como la mía, soy tan dichoso, mi querido amigo, me sojuzga de tal modo la idea de reposar, que no me ocupo de mi arte.</p>
            <p>Ahora no sabría dibujar, ni siquiera hacer una línea con el lápiz; y, sin embargo, jamás he sido mejor pintor Cuando el valle se vela en torno mío con un encaje de vapores; cuando el sol de mediodía centellea sobre la impenetrable sombra de mi bosque sin conseguir otra cosa que filtrar entre las hojas algunos rayos que penetran hasta el fondo del santuario, cuando recostado sobre la crecida hierba, cerca de la cascada, mi vista, más próxima a la tierra, descubre multitud de menudas y diversas plantas; cuando siento más cerca de mi corazón los rumores de vida de ese pequeño mundo que palpita en los tallos de las hojas, y veo las formas innumerables e infinitas de los gusanillos y de los insectos; cuando siento, en fin, la presencia del Todopoderoso, que nos ha creado a su imagen, y el soplo del amor sin limites que nos sostiene y nos mece en el seno de una eterna alegría; amigo mío, si los primeros fulgores del alba me acarician, y el cielo y el mundo que me rodean se reflejan en mi espíritu como la imagen de una mujer adorada, entonces suspiro y exclamo: "¡Si yo pudiera expresar todo lo que siento!</p>
            <p>¡Si todo lo que dentro de mí se agita con tanto calor, con tanta exuberancia de vida, pudiera yo extenderlo sobre el papel, convirtiendo éste en espejo de mi alma, como mi alma es espejo de Dios! " Amigo. . . , Pero me abismo y me anonada la sublimidad de tan magníficas imágenes. Reina en mi espíritu una alegría admirable, muy parecida a las dulces alboradas de la primavera, de que gozo aquí con delicia.</p>
            <p>Estoy solo, y me felicito de vivir en este país, el más a propósito para almas como la mía, soy tan dichoso, mi querido amigo, me sojuzga de tal modo la idea de reposar, que no me ocupo de mi arte.</p>
            <p>Ahora no sabría dibujar, ni siquiera hacer una línea con el lápiz; y, sin embargo, jamás he sido mejor pintor Cuando el valle se vela en torno mío con un encaje de vapores; cuando el sol de mediodía centellea sobre la impenetrable sombra de mi bosque sin conseguir otra cosa que filtrar entre las hojas algunos rayos que penetran hasta el fondo del santuario, cuando recostado sobre la crecida hierba, cerca de la cascada, mi vista, más próxima a la tierra, descubre multitud de menudas y diversas plantas; cuando siento más cerca de mi corazón los rumores de vida de ese pequeño mundo que palpita en los tallos de las hojas, y veo las formas innumerables e infinitas de los gusanillos y de los insectos; cuando siento, en fin, la presencia del Todopoderoso, que nos ha creado a su imagen, y el soplo del amor sin limites que nos sostiene y nos mece en el seno de una eterna alegría; amigo mío, si los primeros fulgores del alba me acarician, y el cielo y el mundo que me rodean se reflejan en mi espíritu como la imagen de una mujer adorada, entonces suspiro y exclamo: "¡Si yo pudiera expresar todo lo que siento!</p>
            <p>¡Si todo lo que dentro de mí se agita con tanto calor, con tanta exuberancia de vida, pudiera yo extenderlo sobre el papel, convirtiendo éste en espejo de mi alma, como mi alma es espejo de Dios! " Amigo. . . , Pero me abismo y me anonada la sublimidad de tan magníficas imágenes. Reina en mi espíritu una alegría admirable, muy parecida a las dulces alboradas de la primavera, de que gozo aquí con delicia.</p>
            <p>Estoy solo, y me felicito de vivir en este país, el más a propósito para almas como la mía, soy tan dichoso, mi querido amigo, me sojuzga de tal modo la idea de reposar, que no me ocupo de mi arte. Ahora no sabría dibujar, ni siquiera hacer una línea con el lápiz; y, sin embargo, jamás he sido mejor pintor Cuando el valle se vela en torno mío con un encaje de vapores; cuando el sol de mediodía centellea sobre la impenetrable sombra de mi bosque sin conseguir otra cosa que filtrar entre las hojas algunos rayos que penetran hasta el fondo del santuario, cuando recostado sobre la crecida hierba, cerca de la cascada, mi vista, más próxima a la tierra, descubre multitud de menudas y diversas plantas; cuando siento más cerca de mi corazón los rumores de vida de ese pequeño mundo que palpita</p>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
};
