import * as React from "react";
import { connect } from "react-redux";
import { IConnectService } from "../interfaces/interfaces";
import { Type, isType } from "../interfaces/type";
import { Module } from "../Module";

export const ReConnect = (ConnectService: Type<IConnectService>) => {
    return (target: Type<any>): any => {

        class Wrap extends target {
            public static module: Module;

            constructor(props: any, context: any) {
                super(props, context);

                const connectService = Wrap.module.getProvider(ConnectService);

                this.component = connect(
                    (...args: any[]) => connectService.mapStateToProps(args),
                    (...args: any[]) => connectService.mapDispatchToProps(args)
                )(target);
            }

            public render() {
                return React.createElement(this.component);
            }
        }

        return Wrap;
    };
};

