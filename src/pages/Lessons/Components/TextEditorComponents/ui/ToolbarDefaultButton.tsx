import type {PluginItem} from "../../../../../types/lessonTypes.ts";
import Button from "../../../../../assets/CommonComponents/Button.tsx";

export default function DefaultButton({
  button,
  action,
  active = false,
  disabled = false
}: {
  button: PluginItem,
  action: (event: string) => void,
  active?: boolean,
  disabled?: boolean
}) {
  return (
    <Button
      onClick={() => action(button.event)}
      aria-label={button.label}
      title={button.label}
      className={`toolbar-button ${active ? 'active' : ''}`}
      disabled={disabled}
    >
      <img src={button.icon} alt={button.label} />
    </Button>
  )
}
