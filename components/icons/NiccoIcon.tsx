export const NiccoIcon = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1727.28 1143.03" // Mantén el viewBox original para que el icono se escale correctamente
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    {...props} // Pasa cualquier otra prop al elemento SVG raíz
  >
    {/* Este es el path principal de tu icono.
          Hemos eliminado las clases 'st1' y el bloque <style>
          para que el color se controle directamente con la prop 'color'. */}
    <path
      fill={color} // Aquí aplicamos el color pasado como prop
      d="M978.86,748.33c-9.08-9.08-18.01-18.41-26.6-27.9,29.98,87.16,46.31,180.67,46.31,278.05H144.56V144.56c235.84,0,449.32,95.6,603.86,250.14,9.08,9.08,18.01,18.41,26.6,27.9-30-87.16-46.31-180.67-46.31-278.05h854.01v853.91c-235.84,0-449.32-95.6-603.86-250.14Z"
    />
  </svg>
);
