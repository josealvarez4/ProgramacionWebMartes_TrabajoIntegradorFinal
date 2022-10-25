-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-10-2022 a las 22:06:30
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `basket`
--

DROP TABLE IF EXISTS `basket`;
CREATE TABLE IF NOT EXISTS `basket` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `equipo` varchar(250) NOT NULL,
  `puntos` varchar(11) NOT NULL,
  `jugados` varchar(11) NOT NULL,
  `ganados` varchar(11) NOT NULL,
  `perdidos` varchar(11) NOT NULL,
  `ppp` varchar(11) NOT NULL,
  `pcpp` varchar(11) NOT NULL,
  `logos` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `basket`
--

INSERT INTO `basket` (`id`, `equipo`, `puntos`, `jugados`, `ganados`, `perdidos`, `ppp`, `pcpp`, `logos`) VALUES
(1, 'Gimnasia y Esgrima', '17', '9', '8', '1', '75', '64', 'tujqgrm4dz8ipwadsm6u'),
(2, 'Almagro', '17', '9', '8', '1', '75', '56', 'ig5yronoily3jlmkyfje'),
(3, 'Rivadavia Junior', '16', '9', '7', '2', '74', '63', 'bpayjoqvb2yh2b42dak9'),
(4, 'Banco Provincial', '15', '9', '6', '3', '70', '70', 'lyt25mtuh7amqm2mnuov'),
(5, 'Regatas Santa Fe', '14', '9', '5', '4', '67', '66', 'omcfnfxfhlwuq3ewmk3n'),
(6, 'Colon Santa Fe', '13', '9', '4', '5', '67', '74', 'tsjdiskssd3w1xjlnxr2'),
(8, 'Alma Junior', '12', '9', '3', '6', '59', '68', 'yshv57rydrwgtdburyxp'),
(9, 'Colon San Justo', '10', '9', '1', '8', '64', '74', 'evpxxzyksprfdr0ag2dw'),
(10, 'Union Santo Tome', '9', '9', '0', '9', '62', '80', 'ehgjrt7tgmzbigw7qmgm'),
(7, 'Union Santa Fe', '12', '9', '3', '6', '9', '10', 'ojf5gd2drs5c3uug9vyg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `futbol`
--

DROP TABLE IF EXISTS `futbol`;
CREATE TABLE IF NOT EXISTS `futbol` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `img_tabla` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `futbol`
--

INSERT INTO `futbol` (`id`, `img_tabla`) VALUES
(1, 'mv1kll2ki0amfyyg91lm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hockey`
--

DROP TABLE IF EXISTS `hockey`;
CREATE TABLE IF NOT EXISTS `hockey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipo` varchar(250) NOT NULL,
  `puntos` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hockey`
--

INSERT INTO `hockey` (`id`, `equipo`, `puntos`) VALUES
(1, 'Club Colón San Justo', '22'),
(2, 'El Quillá Amarillo', '14'),
(3, 'Club Atlético Argentino de San Carlos', '13'),
(4, 'Universidad Nacional Litoral', '6'),
(5, 'Club Atlético Frank', '3'),
(6, 'Club Atlético Unión', '0'),
(8, 'jose', '100');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

DROP TABLE IF EXISTS `noticias`;
CREATE TABLE IF NOT EXISTS `noticias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(1, 'Las Panteras cayeron en sets corridos frente a Bélgica', 'Las Panteras no pudieron ante el poderío de Bélgica, con el que perdieron 3-0, por el segundo partido de la segunda ronda del Mundial de Polonia y Países Bajos', 'El seleccionado argentino femenino de vóleibol, Las Panteras perdió este miércoles por 3 a 0 frente a Bélgica en Rotterdam, por el segundo partido de la segunda ronda (Grupo E) del Mundial de Polonia y Países Bajos.\r\n\r\nLas Panteras cayeron con parciales de 25-16, 25-23 y 25-23. La belga Britt Herbots, máxima anotadora del torneo, fue la goleadora del encuentro con 28 puntos, mientras que la argentina Erika Mercado marcó 12.', 'fwgo4dnmgompecmvwzr6'),
(2, 'Gimnasia y Almagro cerraron arriba la primera rueda de la A1', 'Gimnasia goleó a Unión en tanto Almagro batió como visitante y ambos, con récord 8-1, terminaron como líderes en la zona A1 del Torneo Oficial de Básquet', 'Se completó la primera rueda de la zona A1, en el Torneo Oficial 2022 y de los 10 participantes, dos equipos lograron quedarse con el mejor récord. Por un lado, el actual campéon, Gimnasia. Por su parte, Almagro es el otro que consiguió 8 éxitos en 9 presentaciones.\r\n\r\nEn el estadio cubierto Ángel Malvicino, Gimnasia goleó a Unión A por 86 a 54, con 24 puntos de Guillermo Santillán y la misma de Gonzalo Sabatini. En el dueño de casa, que quedó con registro 3-6 y cerca de la zona de descenso, sumó 14 Julián Salaberry.\r\n\r\nEn el Pay Zumé, Almagro tuvo un último cuarto de alto vuelo, con corrida de 24-11, para doblegar al colista CUST A (0-9) por 76 a 63, con 23 de Leonardo Strack y 15 de Rodrigo Riquelme.', 'ynkc3tfuxnd9leyh0zu6'),
(3, 'Colón estiró su levantada con un gran triunfo ante Patronato', 'Colón sumó por primera vez su segunda victoria seguida en el torneo, al batir 1-0 a Patronato con gol de Wanchope Ábila, de penal. Fue expulsado Formica', 'Colón sumó su segunda victoria al hilo en la Liga Profesional, al superar este miércoles a Patronato por 1 a 0, con un gol convertido por Ramón Wanchope Ábila de penal, en la primera mitad. El equipo de Marcelo Saralegui terminó con 10 por la expulsión de Mauro Formica\r\n\r\nEn los primeros 45 minutos, Colón volvió a ratificar que esta muy mejorado en el aspecto mental y que lo hecho frente a Estudiantes le sirvió de estímulo para afrontar el encuentro ante Patronato con el ánimo bien arriba y una actitud mucho más acorde a lo que venía exponiendo.', 'grk4mlov9e8ox7vptff6'),
(4, 'nueva', '123', '543453', ''),
(5, 'Liga U14: Gimnasia, CUST y Colón (SJ) están en semifinales', 'Gimnasia, CUST y Colón (SJ) se metieron en las semifinales de la Liga Provincial U14, al obtener el pasado domingo el objetivo de quedarse entre los 8 mejores', 'La Liga Provincial U14 cuenta con los 8 equipos que llegaron a las semifinales, entre los que se encuentran tres de la Asociación Santafesina: Gimnasia, CUST y Colón (SJ).\r\n\r\nLos Mensanas salieron primeros en el triangular organizado por Colón (SJ), que en un final dramático superó a San Lorenzo (T) y también pasó de ronda. Por su parte, CUST fue segundo en el mini certamen que armó en el Pay Zumé.', 'qzubd9dnv3l6ezbngjdw'),
(7, ' OVACIÓNMorelli logró bajar su propio récord en los 100 metros pecho', 'Gran actuación tuvo el santafesino Gabriel Morelli en Parque Roca, al conseguir bajar su propio récord en los 100 metros pecho', 'Tal como estaba previsto se disputó el pasado fin de semana el Torneo 53° aniversario de la Federación de Natación de Buenos Aires, el cual se desarrolló en el natatorio olímpico de Parque Roca, con la supervisión de la Confederación Argentina de Deportes Acuáticos. Hay que destacar\r\n\r\nNo caben dudas que Unión de Santa Fe, el equipo que comandan Diego Garbarino y Adrián Tur, cumplieron una más que destacada actuación. En el podio por clubes, el team tatengue finalizó en la tercera ubicación, con un total de 202.5 puntos. El primer puesto quedó en poder de la Sociedad Alemana de Gimnasia de Villa Ballester con 507 puntos, y segundo Once Unidos de Mar del Plata con 409.5.', 'i12ciaeefsy9chuq57xh'),
(6, 'La Copa del Mundo llega este martes al país', 'La Copa del Mundo arribará este martes a Argentina, como parte de la gira que la FIFA realiza antes del Mundial. Habrá una conferencia en el predio de AFA', 'La Copa del Mundo que estará en juego a partir del próximo 20 de noviembre en Qatar llegará este martes a la Argentina, en el marco de la gira que organiza la FIFA, y será presenta en un acto a desarrollarse desde las 13.00 en el predio de la AFA en Ezeiza.\r\n\r\nLuego, el trofeo estará en exhibición para el público en el predio de La Rural, el miércoles 26 y el jueves 27 desde las 9.00 hasta las 20.00.', 'p3c5im0lkkg5vuzeqicn');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'jose', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'pedro', 'd93591bdf7860e1e4ee2fca799911215'),
(3, 'martin', '81dc9bdb52d04dc20036dbd8313ed055'),
(4, 'flavia', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
