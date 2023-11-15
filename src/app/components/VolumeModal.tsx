import { Box, Modal, Typography } from "@mui/material";
import { Roboto_Flex } from "next/font/google";
import { useState } from "react";
import { getModeForResolutionAtIndex } from "typescript";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  type VolumeModalProps = {
    openModal: boolean;
    handleClose: ()=>void;
    volumesName: string;
    synopsis: string
  }

export default function VolumeModal (props: VolumeModalProps) {

    return (
        <div>
            <Modal
                open={props.openModal}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <h1>{props.volumesName}</h1>
                    <h2>Detalhes</h2>
                    <p>{props.synopsis}</p>
                    <div>
                        <button className="mt-8 flex h-10 items-center justify-center w-80 bg-yellow-400 hover:bg-yellow-500 rounded-lg outline-none border-none" title="Favoritar coleção">
                            <div className="flex text-lg">
                                Reservar
                            </div>
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}