import {
  DecoratorNode,
  type DOMConversionMap,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
  createCommand,
  type LexicalCommand,
} from 'lexical';
import type {JSX} from "react";
import GraphComponent from "./GraphNodeComponent.tsx";

export interface GraphPayload {
  width?: number;
  height?: number;
  key?: NodeKey;
}

export type SerializedGraphNode = Spread<
  {
    width?: number;
    height?: number;
  },
  SerializedLexicalNode
>;

export class GraphNode extends DecoratorNode<JSX.Element> {
  __width?: number;
  __height?: number;

  static getType(): string {
    return "graph";
  }

  static clone(node: GraphNode): GraphNode {
    return new GraphNode(
      node.__width,
      node.__height,
      node.__key
    );
  }

  constructor(
    width?: number,
    height?: number,
    key?: NodeKey
  ) {
    super(key);
    this.__width = width;
    this.__height = height;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const className = config.theme.graph;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.className = "graph-node";
    if (this.__width !== undefined) {
      element.setAttribute("width", String(this.__width));
    }
    if (this.__height !== undefined) {
      element.setAttribute("height", String(this.__height));
    }
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (node: Node) => {
        if ((node as HTMLElement).className === "graph-node") {
          return {
            conversion: (element: HTMLElement) => {
              const width = element.getAttribute("width");
              const height = element.getAttribute("height");
              const node = $createGraphNode({
                width: width ? Number(width) : undefined,
                height: height ? Number(height) : undefined,
              });
              return { node };
            },
            priority: 0,
          };
        }
        return null;
      },
    };
  }

  exportJSON(): SerializedGraphNode {
    return {
      width: this.__width,
      height: this.__height,
      type: "graph",
      version: 1,
    };
  }

  static importJSON(serializedNode: SerializedGraphNode): GraphNode {
    const { width, height } = serializedNode;
    return $createGraphNode({
      width,
      height,
    });
  }

  getWidth(): number | undefined {
    return this.__width;
  }

  setWidth(width: number | undefined): void {
    const writable = this.getWritable();
    writable.__width = width;
  }

  getHeight(): number | undefined {
    return this.__height;
  }

  setHeight(height: number | undefined): void {
    const writable = this.getWritable();
    writable.__height = height;
  }

  decorate(): JSX.Element {
    return (
      <GraphComponent
        width={this.__width}
        height={this.__height}
        nodeKey={this.getKey()}
      />
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function $createGraphNode({
  width,
  height,
  key,
}: GraphPayload = {}): GraphNode {
  return new GraphNode(width, height, key);
}

// eslint-disable-next-line react-refresh/only-export-components
export function $isGraphNode(
  node: LexicalNode | null | undefined
): node is GraphNode {
  return node instanceof GraphNode;
}

export interface ResizeGraphPayload {
  nodeKey: NodeKey;
  width: number | undefined;
  height: number | undefined;
}

export const RESIZE_GRAPH_COMMAND: LexicalCommand<ResizeGraphPayload> =
  createCommand("RESIZE_GRAPH_COMMAND");
